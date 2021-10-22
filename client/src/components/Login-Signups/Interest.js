import { useRef } from "react";
const Interest = ({interest, setinterest}) => {
    const interst = useRef(undefined);
    return (
        <>
            <select onChange={() => {setinterest(arr => [...arr, interst.current.value]);
                                        document.getElementById(interst.current.value).disabled="true"}} ref={interst}>
                <option id="Reading" value="Reading">Reading</option>
                <option id="Writing" value="Writing">Writing</option>
                <option id="Singing" value="Singing">Singing</option>
                <option id="Dancing" value="Dancing">Dancing</option>
                <option id="Painting" value="Painting">Painting</option>
                <option id="Craft" value="Craft">Craft</option>
                <option id="Gaming" value="Gaming">Gaming</option>
                <option id="Blogging" value="Blogging">Blogging</option>
                <option id="Teaching" value="Teaching">Teaching</option>
                <option id="Sports" value="Sports">Sports</option>
                <option id="Travelling" value="Travelling">Travelling</option>
                <option id="Anchor" value="Anchor">Anchoring</option>
                <option id="Coding" value="Coding">Coding</option>
                <option id="Photography" value="Photography">Photography</option>
                <option id="Freelancing" value="Freelancing">Freelancing</option>
                <option id="Volunteering" value="Volunteering">Volunteering</option>
                <option id="Podcast" value="Podcast">Podcasts</option>
                <option id="Spirituality" value="Spirituality">Spirituality</option>
                <option id="Anime" value="Anime">Anime</option>
                <option id="Binge" value="Binge">Binge Watching</option>
                <option id="Cooking" value="Cooking">Cooking</option>
                <option id="Development" value="Development">Development</option>
            </select>
        </>
    )
}
export default Interest;