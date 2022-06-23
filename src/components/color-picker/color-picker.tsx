import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Options, useHotkeys } from 'react-hotkeys-hook';

import { Tooltip } from '../tooltip';

import { getColorFromHex, getColorStringForMode, HSVAtoRGBA, RGBAToHex } from '@/utils/colors';
import { ALL_COLOR_MODES, COLOR_PICKER_EVENT_KEY, COLOR_PICKER_RESULT_EVENT_KEY } from '@/utils';
import { ColorMode, ColorPickerOptions } from '@/types';
import { CheckmarkIcon, ChevronIcon } from '@/icons/line';

// create the spotlight color picker wrapper if this is not already created
let spotlightColorPickerWrapper: HTMLDivElement | null = null;
if (typeof window !== 'undefined') {
    spotlightColorPickerWrapper = document.querySelector<HTMLDivElement>('#spotlight-colorpicker');
    if (!spotlightColorPickerWrapper) {
        spotlightColorPickerWrapper = document.createElement('div');
        spotlightColorPickerWrapper.id = 'spotlight-colorpicker';
        document.body.append(spotlightColorPickerWrapper);
    }
}

const preventDefault = (e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
};

export function ColorPicker (): JSX.Element | null {
    const colorPickerRef = useRef<HTMLDivElement>(null);
    const colorAreaDimsRef = useRef<HTMLDivElement>(null);

    // Color picker states
    const [visible, setVisible] = useState<boolean>(false);
    const [areaFocus, setAreaFocus] = useState<boolean>(false);
    const [activeColor, setActiveColor] = useState<string>('#FFFFFFFF');
    const [copied, setCopied] = useState<boolean>(false);

    // Color picker settings
    const [colorModes, setColorModes] = useState<ColorMode[]>(ALL_COLOR_MODES);
    const [activeColorMode, setActiveColorMode] = useState<ColorMode>('hex');
    const [useAlpha, setUseAlpha] = useState<boolean>(true);
    const [title, setTitle] = useState<string>();
    const [showContinue, setShowContinue] = useState<boolean>(false);

    // Current values
    const [hue, setHue] = useState<number>(0);
    const [alpha, setAlpha] = useState<number>(1);
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    // Color values based on the states
    const opaqueHex = activeColor.slice(0, 7);
    const HSLString = `hsl(${hue}, 100%, 50%)`;

    const HOTKEY_OPTIONS: Options = useMemo(() => ({
        enabled: visible,
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }), [visible]);

    // Reset the state when the color picker is closed for next use
    useEffect(() => {
        if (!visible) {
            setActiveColor('#FFFFFFFF');
            setHue(0);
            setAlpha(1);
            setPosition({ x: 0, y: 0 });
            setColorModes(ALL_COLOR_MODES);
            setUseAlpha(true);
            setCopied(false);
            // eslint-disable-next-line unicorn/no-useless-undefined
            setTitle(undefined);
            setShowContinue(false);
        }
    }, [visible]);

    // Register the color picker event listener
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.removeEventListener(COLOR_PICKER_EVENT_KEY, handleNewColorPicker as any, false);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(COLOR_PICKER_EVENT_KEY, handleNewColorPicker as any, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Handle new incoming color picker events
    const handleNewColorPicker = (ev: CustomEvent<ColorPickerOptions>) => {
        setShowContinue(true);
        setVisible(true);
        setColorModes(ev.detail.modes ?? ['hex']);
        setActiveColorMode(ev.detail.modes?.[0] ?? 'hex');
        setUseAlpha(ev.detail.alpha === undefined ? true : ev.detail.alpha);
        setTitle(ev.detail.title ?? undefined);
    };

    const getRectSize = () => {
        return {
            width: colorAreaDimsRef.current?.clientWidth ?? 1,
            height: colorAreaDimsRef.current?.clientHeight ?? 1,
            x: colorAreaDimsRef.current?.getBoundingClientRect().x ?? 0,
            y: colorAreaDimsRef.current?.getBoundingClientRect().y ?? 0,
        };
    };

    const moveMarker = useCallback((event: MouseEvent) => {
        const area = getRectSize();
        let x = event.pageX - area.x;
        let y = event.pageY - area.y;

        x = (x < 0) ? 0 : (x > area.width) ? area.width : x;
        y = (y < 0) ? 0 : (y > area.height) ? area.height : y;

        setPosition({ x, y });
    }, []);

    useEffect(() => {
        if (!colorPickerRef.current) return;
        if (areaFocus) {
            colorPickerRef.current.addEventListener('mousemove', moveMarker);
        } else {
            colorPickerRef.current.removeEventListener('mousemove', moveMarker);
        }
    }, [areaFocus, colorPickerRef, moveMarker]);

    useEffect(() => {
        if (!visible) return;

        const newHsva = {
            h: hue,
            s: position.x / getRectSize().width * 100,
            v: 100 - (position.y / getRectSize().height * 100),
            a: alpha,
        };

        const newHex = RGBAToHex(HSVAtoRGBA(newHsva));
        setActiveColor(newHex);
        setCopied(false);
    }, [visible, hue, alpha, position]);

    const toggleVisible = () => {
        if (visible) {
            hideColorPicker();
            return;
        }
        setVisible((last) => !last);
    };

    const hideColorPicker = () => {
        const ev = new CustomEvent(COLOR_PICKER_RESULT_EVENT_KEY, {
            bubbles: false,
            detail: {
                value: undefined,
                error: new Error('COLOR_PICKER_CLOSED'),
            },
        });
        document.dispatchEvent(ev);
        setVisible(false);
    };

    const handleContinue = () => {
        const ev = new CustomEvent(COLOR_PICKER_RESULT_EVENT_KEY, {
            bubbles: false,
            detail: {
                value: Object.fromEntries(colorModes.map((curr) => [curr, getColorFromHex(curr, activeColor, useAlpha)])),
            },
        });
        document.dispatchEvent(ev);
        setVisible(false);
    };

    const handleColorModeChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
        setCopied(false);
        setActiveColorMode(ev.target.value as ColorMode);
    };

    const handleCopy = () => {
        const value = getColorStringForMode(activeColorMode, activeColor, useAlpha);
        if (navigator.clipboard) {
            void navigator.clipboard?.writeText?.(value);
            setCopied(true);
        }
    };

    useHotkeys('esc', (e) => {
        preventDefault(e);
        hideColorPicker();
    }, HOTKEY_OPTIONS);

    useHotkeys('cmd+shift+j, ctrl+shift+j', (e) => {
        preventDefault(e);
        setShowContinue(false);
        toggleVisible();
    }, {
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [visible]);

    // If we are not able to find the window element, we can not render
    if (typeof window === 'undefined') return null;
    return ReactDOM.createPortal(!visible ? null : (
        <Container ref={colorPickerRef} onMouseUp={() => setAreaFocus(false)}>
            {/* eslint-disable-next-line react/jsx-handler-names */}
            <Background onClick={hideColorPicker} />
            <Content>
                {!!title && (
                    <>
                        <Title>{title}</Title>
                    </>
                )}
                {/* eslint-disable-next-line react/jsx-handler-names */}
                <Picker
                    ref={colorAreaDimsRef}
                    onMouseDown={() => setAreaFocus(true)}
                    $hasTitle={!!title}
                    style={{
                        backgroundColor: HSLString,
                        backgroundImage: `linear-gradient(rgba(0,0,0,0), #000), linear-gradient(90deg, #fff, ${HSLString})`,
                    }}
                >
                    <PickerMarker
                        style={{
                            backgroundColor: opaqueHex,
                            top: position.y,
                            left: position.x,
                        }}
                    />
                </Picker>
                <Settings>
                    <HueWrapper>
                        <SliderInput max={360} value={hue} onChange={(ev) => setHue(Number(ev.target.value))} />
                        <HueMarker style={{ backgroundColor: HSLString, left: `${hue / 360 * 100}%` }} />
                    </HueWrapper>
                    {useAlpha && (
                        <AlphaWrapper>
                            <SliderInput
                                max={100}
                                value={alpha * 100}
                                onChange={(ev) => setAlpha(Number(ev.target.value) / 100)}
                            />
                            <AlphaMarker style={{ left: `${alpha * 100}%` }}>
                                <AlphaMarkerFill style={{ backgroundColor: activeColor }} />
                            </AlphaMarker>
                            <AlphaMask style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0), ${opaqueHex})` }} />
                        </AlphaWrapper>
                    )}
                </Settings>
                <Results>
                    <ColorResult>
                        <ColorSwash style={{ backgroundColor: activeColor }} />
                        <ColorTextWrapper onClick={handleCopy}>
                            {navigator.clipboard ? (
                                <Tooltip direction='top' content={copied ? 'Copied!' : 'Click to copy!'}>
                                    <ColorText>{getColorStringForMode(activeColorMode, activeColor, useAlpha)}</ColorText>
                                </Tooltip>
                            ) : (
                                <ColorText>{getColorStringForMode(activeColorMode, activeColor, useAlpha)}</ColorText>
                            )}
                        </ColorTextWrapper>
                        {colorModes.length > 1 && (
                            <ColorModeSelector>
                                <ColorModeSelect
                                    value={activeColorMode}
                                    onChange={handleColorModeChange}
                                >
                                    {colorModes.map((curr) => (
                                        <option key={curr} value={curr}>{curr.toUpperCase()}</option>
                                    ))}
                                </ColorModeSelect>
                                <ChevronIcon size={20} color='gray1' direction='down' />
                            </ColorModeSelector>
                        )}
                    </ColorResult>
                    {showContinue ? (
                        <Continue onClick={handleContinue}>
                            <span>Continue</span>
                            <StyledCheckmarkIcon color='gray1' size={16} />
                        </Continue>
                    ) : navigator.clipboard ? (
                        <Continue onClick={handleCopy}>
                            <span>{copied ? 'Copied!' : 'Copy to clipboard'}</span>
                            <StyledCheckmarkIcon color='gray1' size={16} />
                        </Continue>
                    ) : null}
                </Results>
            </Content>
        </Container>
    ), spotlightColorPickerWrapper!);
}

const Container = styled.div`
    ${(p) => p.theme.flex.col({ justify: 'center', align: 'center' })}
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99996;
    transform: translate3d(0, 0, 99996px);
`;

const Background = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99997;
    background-color: rgba(0, 0, 0, 0.7);
    animation: ${(p) => p.theme.animation.fadeIn} 0.2s ease-in-out;
`;

const Content = styled.div`
    width: 60%;
    max-width: 275px;
    max-height: 90%;
    background-color: ${(p) => p.theme.color.gray10};
    border-radius: 10px;
    border: 2px solid ${(p) => p.theme.light ? p.theme.color.gray4 : p.theme.color.gray8};
    animation: ${(p) => p.theme.animation.fadeInWithPulse} 0.25s ease-in-out;
    z-index: 99998;

    @media(max-width: 900px) {
        width: 70%;
    }

    @media(max-width: 700px) {
        width: 85%;
    }
`;

const Title = styled.p`
    ${(p) => p.theme.text.System.semibold(15, 'gray2')}
    margin: 15px 10px;
    padding: 0;
    user-select: none;
`;

const Picker = styled.div<{ $hasTitle: boolean }>`
    position: relative;
    width: 100%;
    height: 250px;
    cursor: pointer !important;
    will-change: background-color;

    ${(p) => !p.$hasTitle && `
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    `}
`;

const PickerMarker = styled.div`
    display: block;
    box-sizing: border-box;
    pointer-events: none;
    position: absolute;
    width: 12px;
    height: 12px;
    margin: -6px 0 0 -6px;
    border: 1px solid #fff;
    border-radius: 50%;
    cursor: pointer !important;
    will-change: background-color;
`;

const Settings = styled.div`
    user-select: none;
    position: relative;
    width: 100%;
    margin-top: 10px;
    padding: 10px 15px;
    padding-bottom: 0;
`;

const Slider = styled.div`
    user-select: none;
    position: relative;
    width: 100%;
    height: 8px;
    margin-bottom: 20px;
    border-radius: 4px;
`;

const SliderInput = styled.input.attrs({
    type: 'range',
    min: 0,
})`
    user-select: none;
    position: absolute;
    width: calc(100% + 16px);
    height: 16px;
    left: -8px;
    top: -4px;
    margin: 0;
    cursor: pointer;
    background-color: transparent;
    opacity: 0;
    appearance: none;
    -webkit-appearance: none;
`;

const Marker = styled.div`
    user-select: none;
    position: absolute;
    box-sizing: border-box;
    width: 16px;
    height: 16px;
    top: 0;
    margin: -4px 0 0 -8px;
    border: 2px solid ${(p) => p.theme.color.gray10};
    border-radius: 50%;
    box-shadow: 0 0 2px ${(p) => p.theme.color.gray3};
    pointer-events: none;
    will-change: background-color;
`;

const HueWrapper = styled(Slider)`
    background-image: linear-gradient(to right, #f00 0%, #ff0 16.66%, #0f0 33.33%, #0ff 50%, #00f 66.66%, #f0f 83.33%, #f00 100%);
`;

const HueMarker = styled(Marker)``;

const AlphaWrapper = styled(Slider)`
    background-image: repeating-linear-gradient(45deg,#aaa 25%,transparent 25%,transparent 75%,#aaa 75%,#aaa), repeating-linear-gradient(45deg,#aaa 25%,#fff 25%,#fff 75%,#aaa 75%,#aaa);
    background-position: 0 0,4px 4px;
    background-size: 8px 8px;
`;

const AlphaMarker = styled(Marker)`
    background-image: repeating-linear-gradient(45deg,#aaa 25%,transparent 25%,transparent 75%,#aaa 75%,#aaa), repeating-linear-gradient(45deg,#aaa 25%,#fff 25%,#fff 75%,#aaa 75%,#aaa);
    background-position: 0 0,4px 4px;
    background-size: 8px 8px;
`;

const AlphaMarkerFill = styled.div`
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    border-radius: 50%;
`;

const AlphaMask = styled.span`
    width: 100%;
    height: 100%;
    display: block;
    border-radius: inherit;
`;

const Results = styled.div`
    position: relative;
    width: 100%;
    padding: 10px;
    padding-top: 0;
`;

const StyledCheckmarkIcon = styled(CheckmarkIcon)`
    display: none;

    @media (max-width: 200px) {
        display: block;
    }
`;

const ColorResult = styled.div`
    ${(p) => p.theme.flex.row({ justify: 'center', align: 'stretch' })}
    width: 100%;
    height: 40px;
    border: 2px solid ${(p) => p.theme.color.gray7};
    border-radius: 8px;
    box-sizing: border-box;
    max-width: 100%;
`;

const ColorSwash = styled.div`
    width: 38px;
    min-width: 38px;
    max-width: 38px;
    height: 36px;
    border-right: 2px solid ${(p) => p.theme.color.gray7};
    user-select: none;
    will-change: background-color;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
`;

const ColorTextWrapper = styled.div`
    ${(p) => p.theme.flex.row({ fullWidth: false, justify: 'center', align: 'center' })}
    box-sizing: border-box;
    width: calc(100% - 80px);
    max-width: calc(100% - 80px);
    height: 100%;
    padding: 0 7px;

    > div {
        width: 100%;
    }
`;

const ColorText = styled.p`
    ${(p) => p.theme.text.System.regular(13, 'gray1', 'center')}
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 44px;
`;

const ColorModeSelector = styled.div`
    ${(p) => p.theme.flex.row({ justify: 'center', align: 'center' })}
    position: relative;
    width: 42px;
    min-width: 42px;
    max-width: 42px;
    height: 36px;
    border-left: 2px solid ${(p) => p.theme.color.gray7};
    cursor: pointer;
    user-select: none;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    background-color: transparent;

    transition: background-color 0.2s ease-in-out;
    will-change: background-color;

    :hover {
        background-color: ${(p) => p.theme.color.teal}40;
    }
`;

const ColorModeSelect = styled.select`
    appearance: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    background-color: transparent;
    border: 0;
    outline: 0;
    user-select: none;

    &:focus {
        outline: 0;
    }
`;

const Continue = styled.button`
    ${(p) => p.theme.flex.row({ justify: 'center', align: 'center' })}
    ${(p) => p.theme.text.System.regular(15, 'gray1')}
    border: 2px solid ${(p) => p.theme.color.gray7};
    outline: 0;
    height: 40px;
    border-radius: 8px;
    background-color: transparent;
    overflow: hidden;
    cursor: pointer;
    margin-top: 15px;

    transition: border-color 0.2s ease-in-out, background-color 0.2s ease-in-out;
    will-change: border, color;

    :hover, :focus {
        background-color: ${(p) => p.theme.color.teal}40;
        border: 2px solid ${(p) => p.theme.color.teal};
    }

    > span {
        display: block;

        @media (max-width: 200px) {
            display: none;
        }
    }
`;
