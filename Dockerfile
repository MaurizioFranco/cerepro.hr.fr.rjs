FROM httpd:2.4
LABEL maintainer="maurizio.franco@ymail.com"
WORKDIR /usr/local/apache2/htdocs
ARG artifact
COPY ./$artifact ./
RUN tar -xvf $artifact
RUN rm $artifact
RUN ln -sf /cerepro/candidates/img     /usr/local/apache2/htdocs/canimg
RUN ln -sf /cerepro/candidates/cv      /usr/local/apache2/htdocs/cancv
RUN ln -sf /cerepro/candidates/survey  /usr/local/apache2/htdocs/cansurv

