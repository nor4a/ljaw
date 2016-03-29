# LJAW template

1) Checkout project: <br/>
$ git clone https://github.com/nor4a/ljaw.git ljaw

2) Run the script: <br/>
$ ./ljaw/scripts/composer/post-install.sh

3) <a href="https://help.github.com/articles/generating-an-ssh-key/">Create SSH key</a> and send it to me.

4) Fix the remote url for commits: <br/>
$ git remote set-url origin ssh://nor4a@github.com/nor4a/ljaw.git

5) Copy the settings file and set up the connection to the database in it:<br/>
$ cp ljaw/web/sites/default/default.settings.php ljaw/web/sites/default/settings.php 

6) Import the db dump 

7) Import the files in ljaw/web/sites/default/files directory and set the directory permissions: <br/>
$ chown -R apache.apache ljaw/web/sites/default/files
$ chmod -R 0755 ljaw/web/sites/default/files


