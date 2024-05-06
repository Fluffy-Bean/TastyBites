package database

import (
	"embed"
	"fmt"

	migrate "github.com/rubenv/sql-migrate"
)

//go:embed migrations/*
var dbMigrations embed.FS
var migrations = migrate.EmbedFileSystemMigrationSource{
	FileSystem: dbMigrations,
	Root:       "migrations",
}

func Migrate(Up bool) error {
	var direction migrate.MigrationDirection
	if Up {
		direction = migrate.Up
	} else {
		direction = migrate.Down
	}

	n, err := migrate.Exec(Conn, "sqlite3", migrations, direction)
	if err != nil {
		return err
	}

	fmt.Printf("Applied %d migrations!\n", n)
	return nil
}

func Status() error {
	// Get the list of applied migrations
	applied, err := migrate.GetMigrationRecords(Conn, "sqlite3")
	if err != nil {
		return err
	}

	// Get the list of migrations that are yet to be applied
	planned, _, err := migrate.PlanMigration(Conn, "sqlite3", migrations, migrate.Up, 0)
	if err != nil {
		return err
	}

	fmt.Println("Migration list:")
	for _, migration := range applied {
		fmt.Printf("DONE: %s\n", migration.Id)
	}
	for _, migration := range planned {
		fmt.Printf("TODO: %s\n", migration.Id)
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
