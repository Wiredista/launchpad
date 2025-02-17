# 🚀 LaunchPad

> **🚧 Work in progress:** This project is a work in progress and some features may not be fully implemented yet.

LaunchPad is a web application that allows you to create and manage cards with links to your favorite websites, self hosted services, or anything else you want to have quick access to.

## 📋 Features

Current features include:
- Cards with custom titles, images, and links.
- Administrator panel for configuration and card management.
- Password protection on the administration panel.

Future features may include:
- Editing and reordering cards.
- Easy backup and restore of data.
- Download favicon for links.

## 📷 Screenshots
![Home page](https://github.com/user-attachments/assets/95aa26dd-7ce1-475c-9c8b-9dbbd04580ae)

![Admin panel](https://github.com/user-attachments/assets/b59f6874-9e95-42d1-b0be-c4917bbfef65)



## 📡 Running the project

### 💻 Development
This project requires [bun.js](https://bun.sh/) to run, which is an alternative to `node` and `npm` that provides out-of-the-box support for TypeScript and other features.

You can install it with the following command:  

**Windows:**
```batch
powershell -c "irm bun.sh/install.ps1 | iex"
```

**Linux & macOS**
```bash
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc
```

After installing `bun`, you can follow these steps to run the project:

Clone the repository:
```bash
git clone https://github.com/Wiredista/launchpad.git
cd launchpad
```

Install dependencies:
```bash
bun install
```

Then run the project:
```bash
bun run src/index.ts
```

Web interface will be available at `http://localhost:3000/`.

Default password is `changeme`. You can change it on the admin panel.

### ⛅ Production

The recommended way to run the project in production is using [Docker](https://www.docker.com/). You can build the image with the following command:
```bash
docker build -t launchpad https://github.com/Wiredista/launchpad.git#main
```

Then you can run the image with:
```bash
docker run -p 3000:3000 launchpad
```

Alternatively, you can use [Docker Compose](https://docs.docker.com/compose/install/) to run the project.  To do so, follow these steps.

Create a `docker-compose.yml` file with the following content:
```yaml
services:
  launchpad:
    build: https://github.com/Wiredista/launchpad.git#main
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data
```

Then run the project with:
```bash
docker compose up -d
```

In both cases, the web interface will be available at `http://localhost:3000/`.

If you're running the project in a server, make sure to replace `localhost` with the server's IP address.

You may also want to use a reverse proxy like [Nginx](https://www.nginx.com/) or [Nginx Proxy Manager](https://nginxproxymanager.com/) to handle SSL and other configurations.

## 🤝 Contributing

Contributions are welcome! Please submit issues or pull requests on [GitHub](https://github.com/Wiredista/launchpad).

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.