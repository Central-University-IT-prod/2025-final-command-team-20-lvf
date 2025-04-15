import { Cell } from "@telegram-apps/telegram-ui"
import { memo, useCallback } from "react"
import styles from './SearchSuggestions.module.scss'
import { SearchSuggestionType } from "../../types";

type OwnProps = SearchSuggestionType & {
  onClick?: (id: number) => void;
};

export const SearchSuggestion = memo<OwnProps>(({ id, title, description, subtitle, image, onClick }) => {
  const handleClick = useCallback(() => {
    onClick?.(id);
  }, [id, onClick]);

  return (
    <Cell
      before={<img src={image} alt={title} className={styles.reelImage} />}
      description={description}
      subtitle={subtitle}
      onClick={handleClick}
    >
      {title}
    </Cell>
  )
});
