import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import ConfirmDialog from './ConfirmDialog';

const tryParseUrl = url => {
    try {
        return new URL(url);
    } catch {
        return false;
    }
}

const ExternalButton = ({ href, to, children, ...props }) => {
    const [dialogVisible, setDialogVisible] = useState(false);
    
    const [isExternal, setIsExternal] = useState(false);

    const isClient = typeof window !== 'undefined';

    const url = tryParseUrl(href || to);

    useEffect(() => {
        if (!isClient) return;
    
        setIsExternal(url && url.host !== window.location.host)
    }, []);

    return (
        <>
            <Button
                href={url.toString()}
                {...props}
                onClick={(e) => {
                    if (isExternal) {
                        e.preventDefault();

                        setDialogVisible(true);
                    }
                }}
            >
                {children}
            </Button>
            <ConfirmDialog
                visible={dialogVisible}
                title='You Are Leaving STEM FLEX'
                okText="Continue"
                destructive={true}
                cancelHandler={() => {
                    setDialogVisible(false);
                }}
                okHandler={() => {
                    setDialogVisible(false);

                    window.location.href = url.toString();
                }}
                maxWidth={'40rem'}
            >
                <p>You are now leaving STEM FLEX&#39;s website, to enter the website of a
                    third party organization.</p>
                <p>When you leave the STEM FLEX website, you
                    will be subject to the privacy and security policies of the
                    owners/sponsors of the outside website. We cannot guarantee or endorse
                    the content, information, security, or any other matter related to
                    such third party website.</p>
                <p>Are you sure you want to continue?</p>
            </ConfirmDialog>
        </>
    );
};

ExternalButton.propTypes = {
    href: PropTypes.string,
    to: PropTypes.string,
    children: PropTypes.node,
};

export default ExternalButton;
