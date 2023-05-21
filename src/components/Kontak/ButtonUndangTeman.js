import React from 'react'
import {
    FacebookIcon,
    FacebookMessengerIcon,
    FacebookMessengerShareButton,
    FacebookShareCount,
    HatenaShareCount,
    LineIcon,
    OKShareCount,
    PinterestIcon,
    PinterestShareCount,
    RedditShareCount,
    TelegramIcon,
    TumblrShareCount,
    TwitterIcon,
    VKShareCount,
    WhatsappIcon
  } from "react-share";

 import {
    EmailShareButton,
    FacebookShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton
} from "react-share";
import { app_name } from '../../configs/Constants';

  const shareUrl = 'https://ayachat.aldyweb.com/';
  const shareTitle = 'Aku mengundang Anda ke obrolan rahasia. Buka alamat website untuk Bergabung:'
const ButtonUndangTeman = ({mypage}) => {
    // var width = document.getElementById('myButtonUndangTeman').style.width;
  return (
    <>
        <div id='myButtonUndangTeman'  style={{
            position: 'absolute',
            bottom: 0,
        }}>
            <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target={`#popUndangTeman${mypage}`} aria-controls="popUndangTeman"
                style={{
                    width: 'inherit',
                }}
            >
                Undang Teman
            </button>
        </div>
        <div class="offcanvas offcanvas-bottom" tabindex="-1" id={`popUndangTeman${mypage}`} aria-labelledby="popUndangTemanLabel"
            style={{
                width: 'inherit'
            }}
        >
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="popUndangTemanLabel">Undang Teman</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body small">
                    
                    <div className='row'>
                        <div className='col-2 col-md mb-3'>
                            <WhatsappShareButton
                                url={shareUrl}
                                title={shareTitle}
                                className="network__share-button"
                            >
                                <WhatsappIcon size={32} round />
                            </WhatsappShareButton>
                        </div>
                        <div className='col-2 col-md mb-3'>
                            <TelegramShareButton
                                url={shareUrl}
                                title={shareTitle}
                                className="network__share-button"
                            >
                                <TelegramIcon size={32} round />
                            </TelegramShareButton>
                        </div>
                        <div className='col-2 col-md mb-3'>
                            
                            <FacebookShareButton
                                url={shareUrl}
                                title={shareTitle}
                                className="network__share-button"
                            >
                                <FacebookIcon size={32} round />
                            </FacebookShareButton>
                            <FacebookShareCount url={shareUrl}>
                                {shareCount => <span className="myShareCountWrapper">{shareCount}</span>}
                            </FacebookShareCount>
                        </div>
                        <div className='col-2 col-md mb-3'>
                            <FacebookMessengerShareButton
                                url={shareUrl}
                                title={shareTitle}
                                className="network__share-button"
                            >
                                <FacebookMessengerIcon size={32} round />
                            </FacebookMessengerShareButton>
                        </div>

                        <div className='col-2 col-md mb-3'>
                            <TwitterShareButton
                                url={shareUrl}
                                title={shareTitle}
                                className="network__share-button"
                            >
                                <TwitterIcon size={32} round />
                            </TwitterShareButton>
                        </div>

                        <div className='col-2 col-md mb-3'>
                            <LineShareButton
                                url={shareUrl}
                                title={shareTitle}
                                className="network__share-button"
                            >
                                <LineIcon size={32} round />
                            </LineShareButton>
                        </div>

                        <div className='col-2 col-md mb-3'>
                            <PinterestShareButton
                                url={shareUrl}
                                title={shareTitle}
                                className="network__share-button"
                            >
                                <PinterestIcon size={32} round />
                            </PinterestShareButton>
                        </div>
                    </div>
                    
            </div>
        </div>
    </>
  )
}

export default ButtonUndangTeman