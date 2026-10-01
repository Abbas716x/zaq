# 716QX Lounge OS 3.5 — Apex Edition
# Ultra-Lightweight Production Edge Container
FROM node:20-alpine

# Set non-root security context
WORKDIR /usr/src/app

# Set container production environment
ENV NODE_ENV=production
ENV PORT=7160

# Copy application manifest and configurations
COPY package.json ./

# Copy runtime source files
COPY index.html ./
COPY styles.css ./
COPY 3d-space.js ./
COPY security.js ./
COPY app.js ./
COPY sw.js ./
COPY manifest.json ./
COPY server.js ./

# Enforce secure file permissions
RUN chown -R node:node /usr/src/app

# Switch to unprivileged user
USER node

# Expose LAN POS Cluster Port
EXPOSE 7160

# Health check probe
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:7160/ || exit 1

# Start Zero-Dependency Native Edge Server
CMD ["node", "server.js"]
