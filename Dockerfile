FROM gitea/gitea:1.16.5 AS base

ENV PYTHONUNBUFFERED=1

RUN apk add --update --no-cache python3 py3-pip && \
    ln -sf python3 /usr/bin/python && \
    python3 --version
RUN python3 -m pip install --ignore-installed distlib --no-cache-dir pipenv==2022.8.30

COPY Pipfile* /setup/
RUN cd /setup && pipenv install --system --deploy

COPY . /setup/
RUN /setup/check_git.py && chmod 755 /setup/giteacasc/askpass.py /setup/run.sh
COPY --chown=git:git app.ini /data/gitea/conf/

ENTRYPOINT ["/setup/run.sh"]


