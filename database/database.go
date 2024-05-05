package database

import (
	"database/sql"
	"github.com/mattn/go-sqlite3"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

var Conn *sql.DB

func Open() {
	var err error

	sql.Register("sqlite3_with_extensions",
		&sqlite3.SQLiteDriver{
			Extensions: []string{
				"sqlite3_mod_regexp",
			},
		})

	Conn, err = sql.Open("sqlite3", "tastybites.db?_journal_mode=WAL")
	if err != nil {
		log.Fatal("Error opening connection: ", err)
	}

	//Set the connection to use WAL mode
	_, err = Conn.Exec("PRAGMA journal_mode=WAL;")
	if err != nil {
		log.Fatal(err)
	}
}

func Close() {
	err := Conn.Close()
	if err != nil {
		log.Fatal(err)
	}
}
