package database

import (
	"database/sql"
	"fmt"
	"os"

	"github.com/mattn/go-sqlite3"
)

var Conn *sql.DB

func Open() {
	var err error

	sql.Register("sqlite3_with_extensions", &sqlite3.SQLiteDriver{})

	Conn, err = sql.Open("sqlite3", "tastybites.db?_journal_mode=WAL")
	if err != nil {
		fmt.Println("Error opening connection:", err)
		os.Exit(1)
	}

	//Set the connection to use WAL mode
	_, err = Conn.Exec("PRAGMA journal_mode=WAL;")
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func Close() {
	err := Conn.Close()
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
