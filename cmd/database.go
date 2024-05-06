package cmd

import (
	"flag"
	"fmt"
	"os"

	db "github.com/Fluffy-Bean/TastyBites/database"
)

func migrate(flags []string) {
	cmd := flag.NewFlagSet("migrate", flag.ExitOnError)

	downgrade := cmd.Bool("downgrade", false, "Downgrade Database")

	err := cmd.Parse(flags)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	err = db.Migrate(!*downgrade)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func status(flags []string) {
	err := db.Status()
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
