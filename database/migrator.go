package database

import (
	"bufio"
	"embed"
	"fmt"
	"os"
	"strings"

	migrate "github.com/rubenv/sql-migrate"
)

//go:embed migrations/*
var dbMigrations embed.FS
var migrations = migrate.EmbedFileSystemMigrationSource{
	FileSystem: dbMigrations,
	Root:       "migrations",
}

func Migrate(downgrade, confirm bool) error {
	var direction = migrate.Down
	if !downgrade {
		direction = migrate.Up
	}

	var pending int
	if !downgrade {
		n, _, err := migrate.PlanMigration(Conn, "sqlite3", migrations, migrate.Up, 0)
		if err != nil {
			return err
		}
		pending = len(n)
	} else {
		n, err := migrate.GetMigrationRecords(Conn, "sqlite3")
		if err != nil {
			return err
		}
		pending = len(n)
	}

	if pending == 0 {
		fmt.Println("Nothing to change")
		os.Exit(0)
	}

	if !confirm {
		if downgrade {
			fmt.Printf("Downgrade %d migrations? [Y/n] ", pending)
		} else {
			fmt.Printf("Apply %d pending migrations? [Y/n] ", pending)
		}

		reader := bufio.NewReader(os.Stdin)
		input, _ := reader.ReadString('\n')

		// Format input
		input = strings.TrimSpace(input)
		input = strings.ToLower(input)

		if !strings.HasPrefix(input, "y") && input != "" {
			fmt.Println("Canceling migration")
			os.Exit(0)
		}
	}

	n, err := migrate.Exec(Conn, "sqlite3", migrations, direction)
	if err != nil {
		return err
	}

	if downgrade {
		fmt.Printf("Downgraded %d migrations!\n", n)
	} else {
		fmt.Printf("Applied %d migrations!\n", n)
	}
	return nil
}

func Status() error {
	// Get the list of applied migrations
	applied, err := migrate.GetMigrationRecords(Conn, "sqlite3")
	if err != nil {
		return err
	}

	// Get the list of migrations that are yet to be applied
	pending, _, err := migrate.PlanMigration(Conn, "sqlite3", migrations, migrate.Up, 0)
	if err != nil {
		return err
	}

	fmt.Println("Available migrations:")
	for _, migration := range applied {
		fmt.Printf("  [x]  %s\n", migration.Id)
	}
	for _, migration := range pending {
		fmt.Printf("  [ ]  %s\n", migration.Id)
	}

	if len(pending) > 0 {
		fmt.Printf("\nTo apply %d pending migrations, run `TastyBites migrate`\n", len(pending))
	}

	return nil
}

func Pending() (bool, error) {
	planned, _, err := migrate.PlanMigration(Conn, "sqlite3", migrations, migrate.Up, 0)
	if err != nil {
		return false, err
	}
	return len(planned) > 0, nil
}
