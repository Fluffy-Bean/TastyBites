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

func Migrate(confirm bool) error {
	var direction = migrate.Up

	pending, _, err := migrate.PlanMigration(Conn, "sqlite3", migrations, migrate.Up, 0)
	if err != nil {
		return err
	}
	if len(pending) == 0 {
		fmt.Println("Nothing to change")
		os.Exit(0)
	}

	if !confirm {
		fmt.Printf("Apply %d pending migration(s)? [Y/n] ", len(pending))

		reader := bufio.NewReader(os.Stdin)

		input, _ := reader.ReadString('\n')
		input = strings.TrimSpace(input)
		input = strings.ToLower(input)

		if !strings.HasPrefix(input, "y") && input != "" {
			fmt.Printf("Canceling %d migration(s)\n", len(pending))
			os.Exit(0)
		}
	}

	changes, err := migrate.Exec(Conn, "sqlite3", migrations, direction)
	if err != nil {
		return err
	}

	fmt.Printf("Applied %d migration(s)!\n", changes)
	return nil
}

func Downgrade(confirm bool) error {
	var direction = migrate.Down

	pending, err := migrate.GetMigrationRecords(Conn, "sqlite3")
	if err != nil {
		return err
	}
	if len(pending) == 0 {
		fmt.Println("Nothing to change")
		os.Exit(0)
	}

	if !confirm {
		fmt.Printf("Undo %d migration(s)? [Y/n] ", len(pending))

		reader := bufio.NewReader(os.Stdin)

		input, _ := reader.ReadString('\n')
		input = strings.TrimSpace(input)
		input = strings.ToLower(input)

		if !strings.HasPrefix(input, "y") && input != "" {
			fmt.Printf("Canceling %d downgrade(s)\n", len(pending))
			os.Exit(0)
		}
	}

	changes, err := migrate.Exec(Conn, "sqlite3", migrations, direction)
	if err != nil {
		return err
	}

	fmt.Printf("Undone %d migration(s)!\n", changes)
	return nil
}

func Status() error {
	applied, err := migrate.GetMigrationRecords(Conn, "sqlite3")
	if err != nil {
		return err
	}
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

func GetPending() (bool, error) {
	planned, _, err := migrate.PlanMigration(Conn, "sqlite3", migrations, migrate.Up, 0)
	if err != nil {
		return false, err
	}
	return len(planned) > 0, nil
}
