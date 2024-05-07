package cmd

import (
	"flag"
	"fmt"
	"os"

	"github.com/Fluffy-Bean/TastyBites/api"
	db "github.com/Fluffy-Bean/TastyBites/database"
)

func run(flags []string) {
	cmd := flag.NewFlagSet("run", flag.ExitOnError)

	host := cmd.String("host", "127.0.0.1:8080", "Host address, such as 0.0.0.0:8080")
	skip := cmd.Bool("skipMigrations", false, "Skip any pending migrations")
	logging := cmd.Bool("log", false, "Enable logging for the application")

	err := cmd.Parse(flags)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	if !*skip {
		pending, err := db.GetPending()
		if err != nil {
			fmt.Println(err)
			os.Exit(1)
		}

		if pending {
			fmt.Println("Pending migrations!")
			fmt.Println("Run `TastyBites status` or use the flag -skipMigrations")
			os.Exit(1)
		}
	}

	api.Serve(api.Config{
		Host:    *host,
		Logging: *logging,
	})
}
