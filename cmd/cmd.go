package cmd

import (
	"fmt"
	"os"
)

func Parse() {
	if len(os.Args) < 2 {
		fmt.Println("Use -h or --help for usage")
		os.Exit(1)
	}

	switch os.Args[1] {
	case "run":
		run(os.Args[2:])
	case "-h":
	case "--help":
		fmt.Println("Available commands are:")
		fmt.Println("  run: starts the server")
		fmt.Println("\nTo specific usages, run commandName -h")
	default:
		fmt.Println("Use -h or --help for usage")
		os.Exit(1)
	}
}
