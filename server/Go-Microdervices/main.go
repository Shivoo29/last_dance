// go-microservice/main.go

package main

import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"

    "github.com/patrickmn/go-cache"
    "golang.org/x/text/language"
    "golang.org/x/text/message"
)

var (
    c           = cache.New(cache.NoExpiration, cache.NoExpiration)
    translations = map[string]map[string]string{
        "en": {
            "welcome": "Welcome to the Attendance Management System",
            "attendance_marked": "Attendance marked successfully",
        },
        "es": {
            "welcome": "Bienvenido al Sistema de Gestión de Asistencia",
            "attendance_marked": "Asistencia marcada con éxito",
        },
        // Add more languages and translations as needed
    }
)

func translateHandler(w http.ResponseWriter, r *http.Request) {
    var req struct {
        Lang string `json:"lang"`
        Key  string `json:"key"`
    }
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    cacheKey := fmt.Sprintf("%s:%s", req.Lang, req.Key)
    if translated, found := c.Get(cacheKey); found {
        json.NewEncoder(w).Encode(map[string]string{"translated": translated.(string)})
        return
    }

    tag := language.Make(req.Lang)
    p := message.NewPrinter(tag)

    translated := p.Sprintf(translations[req.Lang][req.Key])
    c.Set(cacheKey, translated, cache.DefaultExpiration)

    json.NewEncoder(w).Encode(map[string]string{"translated": translated})
}

func main() {
    http.HandleFunc("/translate", translateHandler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}