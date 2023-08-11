FROM  node:18.17.1-alpine3.18
WORKDIR /usr/src/app
COPY . .
# RUN cd /usr/src/app/kovatu_backend
RUN chmod +x ./start.sh
ENTRYPOINT [ "./start.sh" ]
EXPOSE 3000
CMD [ "yarn", "dev" ]
