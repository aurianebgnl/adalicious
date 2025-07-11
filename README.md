# 🍽️ Adalicious — API REST (Back-end)

Adalicious est une application de commande de plats, construite avec **Spring Boot** et **PostgreSQL** (hébergé sur **Neon**).

Ce dépôt correspond à la partie **Back-end** de l’application.

---

## 🚀 Stack technique

- **Java 21+**
- **Spring Boot**
- **PostgreSQL** (via [Neon](https://neon.tech))
- ORM : **Spring Data JPA / Hibernate**
- Configuration : `.env` avec [dotenv-spring](https://github.com/cdimascio/dotenv-java)

---

## ⚙️ Lancement du projet

### 1. Cloner le dépôt
```zsh 
git clone git@github.com:aurianebgnl/adalicious.git
``` 

### 2. Lancer le serveur back
```zsh 
cd back/
mvn spring-boot:run
``` 

---

## Liste de routes

GET	    http://localhost:8080/menu	        Affiche le menu
GET	    http://localhost:8080/order	        Affiche toutes les commandes
GET	    http://localhost:8080/order/{id}	Affiche une commande spécifique
POST	http://localhost:8080/order	        Crée une commande
    Body 
        {
            "userName": "Alice",
            "menu": {
                "id": 3
            },
            "status": {
                "id": 1
            }
        }
PUT	    http://localhost:8080/order/{id}	Met à jour une commande
    Body 
        {
            "userName": "Alice",
            "menu": {
                "id": 3
            },
            "status": {
                "id": 2
            }
        }
DELETE  http://localhost:8080/order/{id}	Supprime une commande
