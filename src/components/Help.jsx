import {useState, useLayoutEffect} from 'react'
import { useStore } from '../hooks/useStore.js';

export const Help = () => {
    const [helpVisible] = useStore((state) => [state.helpVisible, state.setHelpVisible]);

    const [visible, setVisible] = useState(helpVisible);

    useLayoutEffect(() => {
        setVisible(helpVisible);
    }, [helpVisible]);

    return (
        <>
            <div className={'absolute centered help '+(visible ? 'visible' : 'hidden')}>
                <h2 className='text-center helpMainTitle'>HELP</h2>
                <ul>
                    <h4 className='helpTitle'>NORMAL CONTROLS</h4>
                    <li>Use <span className='keysText'>WASD</span> Keys for movement</li>
                    <li>Use your <span className='mouseText'>mouse</span> for direction control</li>
                    <li>Press <span className='keysText'>SPACE</span> Key to jump</li>
                    <li><span className='mouseText'>Click</span> to put a block</li>
                    <li>Press <span className='keysText'>Alt</span> Key + <span className='mouseText'>Click</span> to destroy a cube</li>
                    <li>Press <span className='keysText'>Q</span> Key to activate <span className='flyText'>Flying Mode</span></li>

                    <h4 className='helpTitle'>WHEN FLYING MODE ACTIVATED</h4>
                    <li>Press <span className='keysText'>R</span> Key to go up</li>
                    <li>Press <span className='keysText'>F</span> Key to go down</li>
                    <li>{'('}You cannot jump when <span className='flyText'>Flying Mode</span> Activated{')'}</li>

                    <h4 className='helpTitle'>MENU BUTTONS</h4>
                    <li><span className='helpMiniTitle'>Save</span> = Save your current world to your browser</li>
                    <li><span className='helpMiniTitle'>Reset</span> = Erase all blocks {'('}But don´t save{')'}</li>
                    <li><span className='helpMiniTitle'>Fly</span> = Activate <span className='flyText'>Flying Mode</span> {'('}Just as <span className='keysText'>Q</span> Key{')'}</li>
                </ul>
                

            </div>

            <div className='absolute helpDownText'>
                press H Key for Help
            </div>
        </>
    )
}


