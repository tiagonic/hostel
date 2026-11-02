#!/bin/bash

# Garante que o script pare se houver algum erro grave
set -e

echo "Iniciando a conversão de arquivos HEIC para JPG..."

# Procura por arquivos .heic e .HEIC no diretório atual
shopt -s nullglob nocaseglob

arquivos=(*.heic)

if [ ${#arquivos[@]} -eq 0 ]; then
    echo "Nenhum arquivo .heic encontrado no diretório atual."
    exit 0
fi

for arquivo in "${arquivos[@]}"; do
    # Remove a extensão (independente de maiúsculas/minúsculas) e adiciona .jpg
    # Usamos o sed ou manipulação de string básica para extrair o nome base
    nome_base="${arquivo%.*}"
    saida="${nome_base}.jpg"

    echo "Convertendo: '$arquivo' -> '$saida'"
    heif-convert -q 100 "$arquivo" "$saida"
done

echo "Conversão concluída com sucesso! Todos os arquivos foram salvos como JPG."
