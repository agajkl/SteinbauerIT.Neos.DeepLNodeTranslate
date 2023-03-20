<?php
namespace SteinbauerIT\Neos\DeepLNodeTranslate\Domain\Service;

use Neos\Flow\Annotations as Flow;
use DeepL\Translator;

class DeepLService
{

    /**
     * @Flow\InjectConfiguration(package="SteinbauerIT.Neos.DeepLNodeTranslate", path="authKey")
     * @var string
     */
    protected $authKey;

    /**
     * @Flow\InjectConfiguration(package="SteinbauerIT.Neos.DeepLNodeTranslate", path="prefer")
     * @var array
     */
    protected $prefer = [];

    /**
     * @param string $sourceValue
     * @param string $sourceLanguage
     * @param string $targetLanguage
     * @return string
     */
    public function translate(string $sourceValue, string $sourceLanguage, string $targetLanguage): string
    {
        $translator = new Translator($this->authKey);
        if(!empty($sourceValue)) {
            $result = $translator->translateText($sourceValue, $sourceLanguage, $this->setPreferredLanguageShortcut($targetLanguage));
            return $result->text;
        }
        return $sourceValue;
    }

    /**
     * @param string $targetLanguage
     * @return string
     */
    private function setPreferredLanguageShortcut(string $targetLanguage): string
    {
        if(array_key_exists($targetLanguage, $this->prefer)) {
            return $this->prefer[$targetLanguage];
        }
        return $targetLanguage;
    }

}
