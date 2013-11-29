#!/usr/bin/env python

"""fabfile.py: Servers Maintenance"""

__author__      = "Jean-Martin Archer"
__copyright__   = "MIT License"


from fabric.api import run, local

def commit_and_push():
	"""
	Local commit before updating everything.
	"""

	local('git commit -am pushing\ to\ other\ servers.')
	local('git push')
	return True

def staging_pull(hosts = ['alpha']):
	"""
	Connects to the home server which updates the other servers.

	Once the repo has been pulled the Puppet agents running on other servers
	will also update themselves.
	"""
	
	env.hosts = hosts

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

	commit_and_push()
	push_to_cloud()
	pull_to_staging()

	return True
