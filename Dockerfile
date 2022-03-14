FROM node:16

# Create app directory
WORKDIR /usr/src/ausserordentliche_maeuse
#get the Git repository in one Layer
RUN cd /usr/src/ &&\
    git clone https://github.com/Bytecm/ausserordentliche_maeuse.git &&\
    cd /usr/src/ausserordentliche_maeuse

RUN npm install

EXPOSE 8080
CMD [ "npm", "start" ]