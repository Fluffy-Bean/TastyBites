package cmd

import (
	"flag"
	"fmt"
	"os"

	"github.com/Fluffy-Bean/TastyBites/api"
)

func run(flags []string) {
	cmd := flag.NewFlagSet("run", flag.ExitOnError)

	host := cmd.String("host", "127.0.0.1:8080", "Host address, such as 0.0.0.0:8080")
	logging := cmd.Bool("log", false, "Enable logging for the application")

	err := cmd.Parse(flags)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	api.Serve(api.Config{
		Host:    *host,
		Logging: *logging,
	})
}
