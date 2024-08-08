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
      configuration:
        sourceDimensionKeys:
          - language
        targetDimensionKeys:
          - language
        sourceDimensions:
          language:
            - de
            - en
        targetDimensions:
          language:
            - de
            - en
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

* Company: STEINBAUER IT GmbH
* E-Mail: patric.eckhart@steinbauer-it.com
* URL: http://www.steinbauer-it.com
