import React, { useState } from 'react';

import { Container, Overlay } from '@/components/atoms';

import './styles.css';

export function Search (): JSX.Element {
    const [visible, setVisible] = useState(false);

    return (
        <Overlay visible={visible} setVisible={setVisible}>
            <div id='spotlight-search'>
                <Container>
                    spotlight
                </Container>
            </div>
        </Overlay>
    );
}
