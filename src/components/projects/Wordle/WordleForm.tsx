import { FC, useState } from "react";
import { useForm } from 'react-hook-form';
import Button from '@components/shared/Button';
import style from "./Wordle.module.scss";

const WordleForm: FC = () => {
   const { register, handleSubmit, formState: { errors } } = useForm();
   const [customUrl, setCustomUrl] = useState('‏‏‎ ‎');

   const onSubmit = handleSubmit(data => {
      fetch(`/api/encrypt?q=${data.word}${data.maxtries}`, {
         method: 'GET'
      })
         .then(res => res.json())
         .then(({ encrypted }) => {
            const url = `${location.href}?s=${encrypted}`;
            navigator.clipboard.writeText(url);
            setCustomUrl(url);
         });
   });

   return (
      <>
         <h2>Share a custom Wordle</h2>

         <form onSubmit={onSubmit} className={style.wordleForm}>
            <div>
               <div>
                  <label>Word</label>
                  <input
                     type='text'
                     {...register('word', {
                        required: true,
                        maxLength: 8,
                        minLength: 2
                     })}
                  />
                  {errors.word && (<div>Naaa</div>)}
               </div>

               <div>
                  <label>Max Tries</label>
                  <input
                     type='number'
                     defaultValue={6}
                     {...register('maxtries', {
                        required: true,
                        min: 2,
                        max: 9
                     })}
                  />
               </div>
            </div>

            <div>
               <Button role='primary' type='submit'>
                  Create Worlde
               </Button>
               <small>{customUrl}</small>
            </div>

         </form>
      </>
   )
}

export default WordleForm;