Move into cloned project directory and run follows:
- npm install
- npm start


On local development, to see profile images, you need to mount external folder, where images are located.
Suppose 
/cerepro/candidates/img
 is the local main folder where images are located
 and
 /home/maurizio/git/cerepro.hr.fe.rjs
 is the project working directory, 
..do the following command:

ln -sf /cerepro/candidates/img /home/maurizio/git/cerepro.hr.fe.rjs/public/canimg

#####################################################################################################

On local development, to see profile cv files, you need to mount external folder, where files are located.
Suppose 
/cerepro/candidates/cv
 is the local main folder where files are located
 and
 /home/maurizio/git/cerepro.hr.fe.rjs
 is the project working directory, 
..do the following command:

ln -sf /cerepro/candidates/cv /home/maurizio/git/cerepro.hr.fe.rjs/public/cancv