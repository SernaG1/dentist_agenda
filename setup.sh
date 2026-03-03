#!/bin/bash
# Script de configuración inicial del proyacto

echo "================================================"
echo "   Dentist Agenda - Setup Inicial"
echo "================================================"
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar Node.js
echo "${YELLOW}Verificando Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo "${RED}✗ Node.js no está instalado${NC}"
    echo "Descárgalo desde: https://nodejs.org/"
    exit 1
else
    NODE_VERSION=$(node -v)
    echo "${GREEN}✓ Node.js ${NODE_VERSION} encontrado${NC}"
fi

echo ""

# Instalar Backend
echo "${YELLOW}Instalando Backend...${NC}"
cd Backend
if npm install; then
    echo "${GREEN}✓ Backend instalado correctamente${NC}"
else
    echo "${RED}✗ Error al instalar Backend${NC}"
    exit 1
fi
cd ..

echo ""

# Instalar Frontend
echo "${YELLOW}Instalando Frontend...${NC}"
cd Frontend
if npm install; then
    echo "${GREEN}✓ Frontend instalado correctamente${NC}"
else
    echo "${RED}✗ Error al instalar Frontend${NC}"
    exit 1
fi
cd ..

echo ""
echo "${GREEN}================================================${NC}"
echo "${GREEN}✓ Configuración inicial completada!${NC}"
echo "${GREEN}================================================${NC}"
echo ""
echo "Pasos siguientes:"
echo "  1. Configura Backend/.env con tus datos de MySQL"
echo "  2. Inicia el Backend: cd Backend && npm run dev"
echo "  3. Inicia el Frontend: cd Frontend && npm start"
echo ""
echo "Backend: http://localhost:3000"
echo "Frontend: http://localhost:4200"
echo ""
