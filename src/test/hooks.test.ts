import { renderHook, act } from "@testing-library/react";
import { test, expect } from "vitest";
import { useSearch } from "../hooks/useSearch";
import { ChangeEvent } from "react";
import { useModalState } from "../components/ui/Modal/hooks";

test("provides search state and the method to update it", () => {
    const { result } = renderHook(() => useSearch());
    expect(result.current.search).toBe("");
    act(() => {
        result.current.handleSearch({
            target: { value: "test" },
        } as ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.search).toBe("test");
});

test("should return boolean which will describe if modal is open or closed", () => {
    const { result } = renderHook(() => useModalState());
    expect(result.current.modalOpen).toBeFalsy();
    act(() => {
        result.current.handleModalOpen();
    });
    expect(result.current.modalOpen).toBeTruthy();
    act(() => {
        result.current.handleModalClose();
    });
    expect(result.current.modalOpen).toBeFalsy();
});
