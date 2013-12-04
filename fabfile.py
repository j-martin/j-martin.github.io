#!/usr/bin/env python

"""fabfile.py: Servers Maintenance"""

__author__ = "Jean-Martin Archer"
__copyright__ = "MIT License"


from fabric.api import run, local, env, cd


def commit_push():
    """
    Local commit and push to GitHub before updating everything else.
    """

    local('git commit -am pushing\ to\ other\ servers.')
    local('git push')
    return True


def staging_pull(hosts=['alpha']):
    """
    Connects to the home server which updates the other servers.

    Once the repo has been pulled the Puppet agents running on other servers
    will also update themselves.
    """

    env.hosts = hosts

    with cd('/home/shared/website/'):
        run('git pull')
        run('git-ftp -s main push')
        run('git-ftp -s europe push')
    return True


def push2cloud(servers=['heroku', 'rhc']):
    for server in servers:
        local('git push %s master' % server)

    return True


def big_push():
    """
    Pushes everything to all the servers
    """

    staging_pull()
    push2cloud()

    return True
