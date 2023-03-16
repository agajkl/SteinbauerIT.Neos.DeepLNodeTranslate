<?php
namespace SteinbauerIT\Neos\DeepLNodeTranslate\Controller\Api;

use Neos\Flow\Annotations as Flow;
use Neos\Flow\Mvc\Controller\ActionController;
use Neos\Flow\Mvc\View\JsonView;
use SteinbauerIT\Neos\DeepLNodeTranslate\Domain\Service\NodeService;

final class TranslateController extends ActionController
{

    protected $defaultViewObjectName = JsonView::class;

    /**
     * @Flow\Inject
     * @var NodeService
     */
    protected $nodeService;

    /**
     * @param string $nodeType
     * @param array $source
     * @param array $target
     * @return void
     */
    public function translateAction(string $nodeType, array $source, array $target): void
    {
        \Neos\Flow\var_dump('foo');
    }

}
