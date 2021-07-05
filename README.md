# Podflix

Clone da neflix para podcast feito como exercício. Desenvolvido com HTML/CSS/Javascript(jquery por requisito do exercício).

- Possui player para tocar o episódio.
- Episódios do podcast podem ser atualizados executando script PHP feed.php.



### Atualizando

Para atualiza os episódio basta ter o php cli rodando e executar php feed.php. Ele irá gravar o arquivo data.json com as informações dos episódios. 

Para adicionar um novo podcast adiciona uma uma entrada no array $podcasts no arquivo feed.php com o nome do podcast e seu feed seguindo o modelo.

