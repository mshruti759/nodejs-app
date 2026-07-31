# Cloud Learning Hub Deployment Notes

## Local Files

- `index.html`
- `styles.css`
- `app.js`

Upload these files to your NGINX web root on EC2.

## EC2 + NGINX Quick Flow

```bash
sudo dnf update -y
sudo dnf install nginx -y
sudo systemctl enable --now nginx
sudo systemctl status nginx
```

Copy files from your laptop:

```bash
scp -i key.pem index.html styles.css app.js ec2-user@PUBLIC_IP:/tmp/
```

Move them into the web root:

```bash
sudo cp /tmp/index.html /usr/share/nginx/html/
sudo cp /tmp/styles.css /usr/share/nginx/html/
sudo cp /tmp/app.js /usr/share/nginx/html/
```

## Domain + HTTPS Checklist

1. Add an A record pointing your domain to the EC2 public IP.
2. Open ports 80 and 443 in the EC2 security group.
3. Install Certbot for your Amazon Linux version.
4. Run Certbot with your domain.
5. Test with `curl -I https://yourdomain.com`.
