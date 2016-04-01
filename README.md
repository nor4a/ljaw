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


Debug problems

1) Recursive structures in twig causing memory usage: {{ kint(fields) }}: <br/>
The solution:
/modules/contrib/devel/kint/kint/config.default.php
line 89
changed to 3



Edit Edit
 Copy Copy
 Delete Delete
block.block.phone
a:12:{s:4:"uuid";s:36:"0d5844fb-a8da-4bef-8600-ae6d94a3c8e7";s:8:"langcode";s:2:"en";s:6:"status";b:1;s:12:"dependencies";a:1:{s:5:"theme";a:1:{i:0;s:3:"lja";}}s:2:"id";s:5:"phone";s:5:"theme";s:3:"lja";s:6:"region";s:7:"content";s:6:"weight";i:-8;s:8:"provider";N;s:6:"plugin";s:50:"block_content:32336b7a-d492-4b4a-961b-27cb0a7a4210";s:8:"settings";a:7:{s:2:"id";s:50:"block_content:32336b7a-d492-4b4a-961b-