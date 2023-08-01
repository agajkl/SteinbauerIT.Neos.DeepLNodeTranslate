<?php
namespace SteinbauerIT\Neos\DeepLNodeTranslate\Controller\Api;

use Neos\Flow\Annotations as Flow;
use Neos\Flow\Mvc\Controller\ActionController;
use Neos\Flow\Mvc\View\JsonView;
use SteinbauerIT\Neos\DeepLNodeTranslate\Domain\Service\DeepLService;
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
     * @Flow\Inject
     * @var DeepLService
     */
    protected $deepLService;

    /**
     * @param string $nodeType
     * @param array $source
     * @param array $target
     * @param string $nodeIdentifier
     * @return void
     * @Flow\SkipCsrfProtection
     */
    public function translateAction(string $nodeType, array $source, array $target, string $nodeIdentifier): void
    {
        $this->nodeService->translateInline(json_decode($source[0], true), json_decode($target[0], true), $nodeIdentifier);
        $this->view->assign('value', ['response' => true]);
    }

}
