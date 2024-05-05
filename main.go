package main

import (
	"github.com/Fluffy-Bean/TastyBites/cmd"
	"github.com/Fluffy-Bean/TastyBites/database"
)

func main() {
	// Open the DB here, because I'm gamer
	database.Open()
	cmd.Parse()
	database.Close()
}
