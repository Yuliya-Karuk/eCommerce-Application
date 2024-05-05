import { basename, resolve } from 'path';

const projectFolder = basename(resolve());
const buildFolder = `./dist`, //Можно использовать projectFolder
   srcFolder = `./src`;

export const path = {
   src: {
      favIcon: `${srcFolder}/favicon.svg`,
   },
};
