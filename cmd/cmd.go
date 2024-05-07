package cmd

import (
	"fmt"
	"os"
)

func Parse() {
	if len(os.Args) < 2 {
		fmt.Println("Use -h or -help for usage")
		os.Exit(1)
	}

	switch os.Args[1] {
	case "run":
		run(os.Args[2:])
	case "migrate":
		migrate(os.Args[2:])
	case "downgrade":
		downgrade(os.Args[2:])
	case "status":
		status(os.Args[2:])
	case "-h":
		fallthrough
	case "-help":
		fmt.Println("Available commands are:")
		fmt.Println("  run:       starts the server")
		fmt.Println("  migrate:   migrates database")
		fmt.Println("  downgrade: undoes database migrations")
		fmt.Println("  status:    checks if there are pending migrations")
		fmt.Println("\nTo specific usages, run commandName -h")
	default:
		fmt.Println("Use -h or -help for usage")
		os.Exit(1)
	}
}
