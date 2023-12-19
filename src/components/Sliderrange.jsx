import * as Slider from "@radix-ui/react-slider";

export function Sliderrange({ myRef, value, onChangev, max}) {
  
  return (
    <div className="w-full group">
      <Slider.Root
        ref={myRef}
        className="relative flex items-center full h-5"
        defaultValue={[0]}
        max={max}
        value={[myRef]}
        onValueChange={onChangev}
      >
        <Slider.Track className="bg-slate-500 A10 relative grow rounded-full h-[5px]">
          <Slider.Range className="absolute bg-white rounded-full h-full group-hover:bg-cyan-400" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-0 h-0 group-hover:h-3 group-hover:w-3 transition-all duration-300 bg-white rounded-[10px] hover:bg-violet3 focus:outline-none"
          aria-label="Volume"
        />
      </Slider.Root>
    </div>
  );
}
