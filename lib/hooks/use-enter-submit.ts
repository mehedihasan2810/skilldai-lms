import { SyntheticEvent } from "react";

export const useEnterSubmit = ({
  onSubmit,
}: {
  onSubmit: (event?: SyntheticEvent) => void;
}): {
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
} => {
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();
      onSubmit(event);
    }
  };

  return { onKeyDown: handleKeyDown };
};
