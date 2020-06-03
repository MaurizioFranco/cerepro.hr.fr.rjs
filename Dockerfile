FROM httpd:2.4
LABEL maintainer="Maurizio Franco"
WORKDIR /usr/local/apache2/htdocs
COPY ./*.tar ./
RUN tar -xvf *.tar
RUN rm *.tar
RUN ln -sf /cerepro/candidates/img /usr/local/apache2/htdocs/canimg
RUN ln -sf /cerepro/candidates/cv  /usr/local/apache2/htdocs/cancv
