# Use official PHP image with Apache
FROM php:8.2-apache

# Enable Apache mod_rewrite if needed (common for Laravel or .htaccess usage)
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Copy project files into the container
COPY . /var/www/html/

# Set permissions (optional but recommended)
RUN chown -R www-data:www-data /var/www/html

# Expose port 80 (Render uses this by default)
EXPOSE 80
