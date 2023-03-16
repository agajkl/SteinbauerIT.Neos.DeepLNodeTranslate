# DeepL Translation for Neos nodes

**Caution: This package is in development!**

## Installation

Just run:

```
composer require steinbauerit/neos-deepltranslate
```

## Configuration

```yaml
SteinbauerIT:
  Neos:
    DeepLNodeTranslate:
      authKey: 'your-auth-key'
      nodeTypes:
        'Neos.NodeTypes:Headline':
          label: Headline
          properties:
            - title
        'Neos.NodeTypes:Text':
          label: Text
          properties:
            - text
      prefer:
        en: 'en-GB'
```

## Author

* E-Mail: mail@patriceckhart.com
* URL: http://www.patriceckhart.com 
