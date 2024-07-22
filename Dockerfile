# Usa la imagen base de Node.js estable
FROM node:current

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de package.json y yarn.lock
COPY package.json yarn.lock ./

# Copiar la carpeta summernote
COPY summernote ./summernote

# Instalar las dependencias
RUN yarn install

# Copiar todo el código fuente, excepto lo que está en .dockerignore
COPY . .

# Exponer el puerto 5000
EXPOSE 5000

# Comando por defecto para iniciar la aplicación en modo desarrollo
CMD ["yarn", "dev"]
