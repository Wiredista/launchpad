# 🚀 WebCards LaunchPad

> **Note:** 📢 This project is a work in progress and some features may not be fully implemented yet.

WebCards LaunchPad is a web application that allows you to create and manage cards with links to your favorite websites, self hosted services, or anything else you want to have quick access to.

## 📋 Features

Current features include:
- Cards with custom titles, images, and links
- Admin panel to manage cards
- Separate web interfaces for users and admins
- Admin authentication with custom password

Future features may include:
- Editing and reordering cards
- Customizing the web interface
- Easy backup and restore of data
- Unified web interface for users and admins
- Download favicon for links

## 📡 Running the project

### 💻 Development
This project requires [bun.js](https://bun.sh/) to run, which is an alternative to `node` and `npm` that provides out-of-the-box support for TypeScript and other features.

You can install it with the following command:
```bash
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc
```

After installing `bun`, you can follow these steps to run the project:

Clone the repository:
```bash
git clone URL
```

Install dependencies:
```bash
bun install
```

Then run the project:
```bash
bun run src/index.ts
```

Web interface will be available at `http://localhost:3000/` and admin panel at `http://localhost:3001/`.

Default password is `insecure`. You can change it on the admin panel.

### ⛅ Production

The recommended way to run the project in production is using [Docker](https://www.docker.com/). You can build the image with the following command:
```bash
docker build -t home-cards .
```

Then you can run the image with:
```bash
docker run -p 3000:3000 -p 3001:3001 home-cards
```

Alternatively, you can use [Docker Compose](https://docs.docker.com/compose/install/) to run the project. To do so, build the image as described above and then follow these steps:


Create a `docker-compose.yml` file with the following content:
```yaml
services:
  home-cards:
    image: home-cards
    ports:
      - "3000:3000"
      - "3001:3001"
    volumes:
      - ./data:/app/data
```

Then run the project with:
```bash
docker compose up -d
```

In both cases, the web interface will be available at `http://localhost:3000/` and admin panel at `http://localhost:3001/`.

If you're running the project in a server, make sure to replace `localhost` with the server's IP address.

You may also want to use a reverse proxy like [Nginx](https://www.nginx.com/) or [Nginx Proxy Manager](https://nginxproxymanager.com/) to handle SSL and other configurations.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.