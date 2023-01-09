import { useStore } from "../hooks/useStore"

export const Menu = () => {
    const [saveWorld, resetWorld, setFlyingMode] = useStore((state) => [state.saveWorld, state.resetWorld, state.setFlyingMode]);

    return (
        <div className="menu absolute">
            <button
                onClick={() => saveWorld()}
            >Save</button>

            <button
                onClick={() => resetWorld()}
            >Reset</button>

            <button
                onClick={() => setFlyingMode()}
            >Fly</button>
        </div>
    )
}