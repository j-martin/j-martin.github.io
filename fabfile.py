#!/usr/bin/env python

"""fabfile.py: Servers Maintenance"""

__author__      = "Jean-Martin Archer"
__copyright__   = "MIT License"


from fabric.api import run, local

def commit():
	"""
	Local commit before updating everything.
	"""

	local('git commit -am pushing\ to\ other\ servers.')
	return True

def server_pull(hosts = ['alpha']):
	"""
	Connects to the home server which updates the other servers.

	Once the repo has been pulled the Puppet agents running on other servers
	will also update themselves.
	"""

	run ('cd /home/shared/website/')
	run ('git pull')
	run ('git-ftp -s main push')
	run ('git-ftp -s euro push')
	return True

def push_to_cloud(servers = ['heroku', 'rhc']):
	for server in servers:
		local('git push %s master' % server)

	return True

def big_push():
	"""
	Pushes everything to all the servers
	"""

	commit()
	push_to_cloud()
	push_to_ftp()

	return True
