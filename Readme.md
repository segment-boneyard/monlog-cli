
# monlog-cli

  CLI for [monlog](https://github.com/segmentio/monlog).

## Installation

```
$ npm install -g monlog-cli
```

## Usage

```

  Usage: monlog-cli [options] [query]

  Options:

    -h, --help       output usage information
    -V, --version    output the version number
    -u, --url <url>  elastic search url

```

## Setup

  Since manually specifying `--url` is annoying, you may want to alias this executable:

```
alias logs='monlog-cli --url <address>'
```

 Allowing you to simply run:

```
$ logs level:error AND hostname:api6-1
```

# License

  MIT