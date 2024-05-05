package cmd

import (
	"flag"
	"fmt"
	"log"
	"os"

	db "github.com/Fluffy-Bean/TastyBites/database"
	sb "github.com/huandu/go-sqlbuilder"
)

func migrate(flags []string) {

	cmd := flag.NewFlagSet("migrate", flag.ExitOnError)

	tables := cmd.Bool("tables", false, "Create tables")
	verbose := cmd.Bool("v", false, "Verbose")

	err := cmd.Parse(flags)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	if !*tables {
		builder := db.ItemStruct.InsertInto("Item")
		for _, item := range db.SampleData {
			builder.Values(item.UUID, item.Name, item.Price, item.Description)
		}
		query, args := builder.Build()

		_, err = db.Conn.Exec(query, args...)
		if err != nil {
			log.Fatal(err)
		} else {
			fmt.Println("Success")
		}
	} else {
		itemTable := sb.CreateTable("Item").IfNotExists()
		itemTable.Define("uuid", "TEXT", "NOT NULL", "PRIMARY KEY")
		itemTable.Define("name", "TEXT", "NOT NULL")
		itemTable.Define("price", "INTEGER", "NOT NULL")
		itemTable.Define("description", "TEXT")
		query, args := itemTable.BuildWithFlavor(sb.SQLite)

		if *verbose {
			fmt.Println(query, args)
		}

		_, err := db.Conn.Exec(query, args...)
		if err != nil {
			log.Fatal(err)
		} else {
			fmt.Println("Success")
		}
	}
}
