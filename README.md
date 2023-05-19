# Galeree

Welcome to Galeree! Galeree is a social network platform designed specifically for visual artists. The aim of this platform is to connect artists from all over the world, and provide a space where they can share their work, receive feedback, and grow together.

## Features 

1. **Post Artwork**: Share your art with the world. Users can upload their art pieces as images.

2. **Comments**: Interact with other artists through comments. Start a conversation around an art piece, provide feedback, or express your admiration.

3. **Likes**: Show your appreciation for an art piece by liking it.

## Tech Stack

This application is built using the following technologies:

- Front-end: React.js
- Back-end: Node.js with Express.js
- Database: Postgres with Prisma as an ORM

## Prerequisites

To run this project, you will need:

- Node.js and npm installed on your machine.
- Postgres database server running on your machine.
- Prisma CLI installed on your machine.

## Getting Started

### Clone the Repository

First, let's clone the repo:

```bash
git clone https://github.com/YacineKadri/galeree.git
cd Galeree
```

### Install Dependencies

Install the project dependencies by running:

```bash
npm install
```

### Setup Database

After setting up your Postgres server:

1. Update the `DATABASE_URL` in the `.env` file.
2. Migrate the database by running `npx prisma migrate dev`.

### Start the Application

Once everything is set up, you can start the application by running:

```bash
npm start
```

Now, Galeree should be running at http://localhost:3000.

## Contributing

We value your contributions. Whether you're fixing a bug, implementing a new feature, or improving documentation, we'd love to have you as part of the project. Please fork the repository and create a pull request for any changes.

## License

This project is licensed under the terms of the MIT license.

---

Feel free to raise an issue or submit a pull request. Happy coding!
